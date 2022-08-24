import { ReportHandler } from 'web-vitals';
import { useEffect} from "react";
import { useLocation } from "react-router-dom";

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // track pageview with gtag / react-ga / react-ga4, for example:
    window.gtag("event", "page_view", {
      page_title: location.pathname,
      page_path: location.pathname + location.search
    });
    /*window.gtag('set', 'page', location.pathname + location.search);
    window.gtag('send', 'pageview');*/
  }, [location]);
};

export { reportWebVitals, usePageTracking }
