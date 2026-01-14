import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

console.log("RevenueCat Webhook Function Initialized")

Deno.serve(async (req) => {
    try {
        // 1. Verify Secret (Basic Auth or specific header)
        // For simplicity, we check a shared secret in the query or header
        // Ideally, pass this as an Authorization header from RevenueCat
        const authHeader = req.headers.get('Authorization')
        if (authHeader !== `Bearer ${Deno.env.get('REVENUECAT_WEBHOOK_SECRET')}`) {
            // Allow testing without secret for now if not set, but warn
            if (Deno.env.get('REVENUECAT_WEBHOOK_SECRET')) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
            }
        }

        const { event } = await req.json()
        console.log('Received event:', event.type)

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const userId = event.app_user_id
        // RevenueCat event types that imply active subscription
        const activeEvents = ['INITIAL_PURCHASE', 'RENEWAL', 'PRODUCT_CHANGE', 'UNCANCELLATION']
        // Events that imply expiration
        const expiredEvents = ['EXPIRATION', 'CANCELLATION'] // Cancellation might still be active until end of period, logic depends on RC payload often containing current entitlement status.

        // Better approach: Trust the webhooks entitlement info if available, or just toggle flag based on type.
        // For absolute correctness, you usually fetch user status from RC API, but for simple sync:

        let isPro = false

        if (activeEvents.includes(event.type)) {
            isPro = true
        } else if (expiredEvents.includes(event.type)) {
            isPro = false
        } else {
            // Transfer, Non-renewing, etc.
            // We'll ignore other events or handle specifically
            return new Response(JSON.stringify({ message: 'Event ignored' }), { status: 200 })
        }

        // Update Profile
        const { error } = await supabase
            .from('profiles')
            .update({ is_pro: isPro, updated_at: new Date() })
            .eq('id', userId)

        if (error) {
            console.error('Database update failed:', error)
            return new Response(JSON.stringify({ error: error.message }), { status: 500 })
        }

        return new Response(JSON.stringify({ message: 'Success', is_pro_set: isPro }), {
            headers: { 'Content-Type': 'application/json' },
        })

    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ error: err.message }), { status: 400 })
    }
})
