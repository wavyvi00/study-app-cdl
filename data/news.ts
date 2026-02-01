/**
 * CDL News Updates Data
 * 
 * Contains official CDL testing updates, rule changes, and policy updates
 * with focus on Florida and FMCSA regulations.
 */

export type NewsTag = 'Important' | 'Upcoming' | 'General';

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    tag: NewsTag;
    source: string;
    link?: string;
    updatedAt: string; // ISO date string
    fullContent: string;
}

/**
 * Sample CDL news items - sorted by date (newest first)
 * To add/edit updates, modify this array.
 */
export const NEWS_ITEMS: NewsItem[] = [
    {
        id: 'florida-english-only-2026',
        title: 'Florida CDL Tests to be English-Only',
        summary: 'Effective Feb 6, 2026: All Florida Driver License exams must be taken in English. No translation aids permitted.',
        tag: 'Important',
        source: 'Florida DHSMV',
        link: 'https://www.flhsmv.gov/',
        updatedAt: '2026-02-01',
        fullContent: 'Effective February 6, 2026, the Florida Department of Highway Safety and Motor Vehicles (FLHSMV) will require all Driver License knowledge and skills examinations to be administered in English. This includes all CDL written tests. Translation services and dictionaries will no longer be permitted during testing. Prepare accordingly.',
    },
    {
        id: 'fmcsa-downgrade-clearinghouse',
        title: 'CDL Downgrade for Clearinghouse Violations',
        summary: 'Drivers with "prohibited" Clearinghouse status will face automatic CDL downgrades.',
        tag: 'Important',
        source: 'FMCSA',
        link: 'https://clearinghouse.fmcsa.dot.gov/',
        updatedAt: '2026-01-20',
        fullContent: 'FMCSA now requires State Driver Licensing Agencies to remove commercial driving privileges from individuals with a "prohibited" status in the Drug and Alcohol Clearinghouse. This downgrade remains in effect until the driver completes the Return-to-Duty (RTD) process. Check your status immediately.',
    },
    {
        id: 'florida-simplified-renewal',
        title: 'Simplified CDL Renewals in Florida',
        summary: 'Drivers with expired CDLs may not need to retake skills exams.',
        tag: 'General',
        source: 'Florida DHSMV',
        link: 'https://www.flhsmv.gov/driver-licenses-id-cards/commercial-motor-vehicle-drivers/',
        updatedAt: '2026-01-15',
        fullContent: 'Florida has eased the renewal process for CDLs expired for more than one year. Eligible drivers with a clean record may no longer be required to retake knowledge and skills exams. This applies to previous Florida CDL holders meeting specific criteria. Contact your local tax collector office for eligibility.',
    },
    {
        id: 'fmcsa-usdot-transition',
        title: 'Transition to USDOT Number as Sole Identifier',
        summary: 'FMCSA phasing out MC numbers in favor of USDOT numbers for motor carriers.',
        tag: 'Upcoming',
        source: 'FMCSA',
        link: 'https://www.fmcsa.dot.gov/registration',
        updatedAt: '2025-12-10',
        fullContent: 'The FMCSA is transitioning to use the USDOT Number as the sole identifier for motor carriers, phasing out MC (Docket) Numbers. Carriers should ensure their vehicle markings and registration documents reflect their USDOT Number accurately to avoid enforcement delays.',
    },
    {
        id: 'fmcsa-residency-requirement',
        title: 'Stricter Residency Requirements for CDL',
        summary: 'New federal rules differ CDL issuance for non-domiciled drivers.',
        tag: 'Important',
        source: 'FMCSA',
        link: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license',
        updatedAt: '2025-11-25',
        fullContent: 'Updated FMCSA rules restrict the issuance of CDLs and CLPs to U.S. citizens and lawful permanent residents. Non-domiciled drivers face stricter verification processes. Ensure your proof of residency and legal presence documents are up to date before your next renewal.',
    },
];

/**
 * Get all news items sorted by date (newest first)
 */
export function getNewsItems(): NewsItem[] {
    return [...NEWS_ITEMS].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

/**
 * Get limited news items for preview sections
 */
export function getNewsPreview(limit: number = 3): NewsItem[] {
    return getNewsItems().slice(0, limit);
}

/**
 * Get a single news item by ID
 */
export function getNewsItemById(id: string): NewsItem | undefined {
    return NEWS_ITEMS.find(item => item.id === id);
}
