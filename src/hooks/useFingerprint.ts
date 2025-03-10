import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

const useFingerprints = () => {
  const [fingerprint, setFingerprint] = useState<string>();
  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    loadFingerprint().then();
  }, []);
  return { fingerprint };
};
export { useFingerprints };
