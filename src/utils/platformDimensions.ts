export const PLATFORM_DIMENSIONS: Record<string, { width: number; height: number }> = {
    TikTok: { width: 1080, height: 1920 },
    Shorts: { width: 1080, height: 1920 },
    Reels: { width: 1080, height: 1920 },
    YouTube: { width: 1920, height: 1080 },
    Bilibili: { width: 1920, height: 1080 },
    InstagramPost: { width: 1080, height: 1350 },
};

export const getDimensionsForPlatform = (platform: string) => {
    return PLATFORM_DIMENSIONS[platform] || PLATFORM_DIMENSIONS['TikTok']; // Default to 9:16
};
