// GA4 이벤트 추적 유틸리티

interface GtagEvent {
    action: string;
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
}

// GA4 window.gtag 타입 정의
declare global {
    interface Window {
        gtag?: (command: string, action: string, config?: Record<string, any>) => void;
    }
}

/**
 * 페이지뷰 이벤트 추적
 * @param path - 페이지 경로
 * @param title - 페이지 제목
 */
export const pageview = (path: string, title: string) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
        page_path: path,
        page_title: title,
    });
};

/**
 * 커스텀 이벤트 추적
 * @param eventName - GA4 이벤트 이름 (snake_case)
 * @param eventData - 이벤트 데이터
 */
export const trackEvent = (eventName: string, eventData: Record<string, any> = {}) => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', eventName, eventData);
};

/**
 * CTA 클릭 추적 (select_content)
 * @param contentName - 버튼/링크 이름
 * @param contentType - 콘텐츠 타입
 */
export const trackCTAClick = (contentName: string, contentType: string = 'button') => {
    trackEvent('select_content', {
        content_name: contentName,
        content_type: contentType,
    });
};

/**
 * 리드 생성 이벤트 (generate_lead)
 * @param leadType - 리드 타입 (예: email, phone)
 * @param leadValue - 리드 가치
 */
export const trackLeadGeneration = (leadType: string = 'email', leadValue: number = 0) => {
    trackEvent('generate_lead', {
        lead_type: leadType,
        value: leadValue,
        currency: 'KRW',
    });
};

/**
 * 스크롤 깊이 추적
 * @param scrollDepth - 스크롤 깊이 (25, 50, 75, 100)
 */
export const trackScrollDepth = (scrollDepth: number) => {
    trackEvent('scroll', {
        percent_scrolled: scrollDepth,
    });
};

/**
 * 스크롤 깊이 자동 감지 hook
 * 컴포넌트에서: useScrollTracking()
 */
export const useScrollTracking = () => {
    if (typeof window === 'undefined') return;

    const trackedDepths = new Set<number>();

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        [25, 50, 75, 100].forEach((depth) => {
            if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                trackedDepths.add(depth);
                trackScrollDepth(depth);
            }
        });
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }
};
