
import React, { useEffect, useState } from 'react';
import AlertPopup from '../pages/AlertPopup';

const DNS_AlertComp = ({ alertsEnabled }) => {
  const [alerts, setAlerts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
 

  const pollingFunction = async (apiEndpoint, alertType) => {
    try {
      if (!alertsEnabled) {
        // Skip fetching alerts if alerts are disabled
        return;
      }
     
      // '1697222557.240504' dns_ex
      // '1698858076.037501';
      //1698861996.042233 ddos
      // Date.now()
      //'1705347843.0'
    //Math.floor(timestamp1 / 1000)
      const timestamp1=Date.now()-60000
      const timestamp = Math.floor(timestamp1 / 1000).toString();
      console.log("timestamp",timestamp)
      const timeframe = 1000;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/${apiEndpoint}?timestamp=${timestamp}&timeframe=${timeframe}`);

      if (response.ok) {
        const newAlerts = await response.json();
        console.log(newAlerts)

        // Display the popup if new alerts are received
        if (newAlerts.length > 0) {
          setAlerts(newAlerts);
          setShowPopup(true);
         
           // Notify parent component if needed
        }
      } else {
        console.error(`Failed to fetch ${apiEndpoint} alerts`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initial call to fetch DNS alerts
   pollingFunction('DNS/DNS_Alerts','dnsCount');
   pollingFunction('encrypted/Encrypted_Alerts','encryptionCount');
   pollingFunction('Anomly/Anomly_Alert','AnomlyCount');
   pollingFunction('Mitre/Mitre_Alert','MitreCount');

    // Set up the polling interval for DNS alerts
   const dnsIntervalId = setInterval(() => pollingFunction('DNS/DNS_Alerts','dnsCount'), 10000); // Poll every 2 minutes
   const dnsExfiltrationIntervalId = setInterval(() => pollingFunction('DNSExfilter/DNSExfilter_Alerts','dnsExfiltrationCount'), 10000);

    // Set up the polling interval for DDOS alerts
   const ddosIntervalId = setInterval(() => pollingFunction('DDOS/DDOS_Alerts','ddosCount'), 10000);
    const encryptionIntervalId = setInterval(() => pollingFunction('encrypted/Encrypted_Alerts','encryptionCount'), 10000);
    const AnomlyIntervalId = setInterval(() => pollingFunction('Anomly/Anomly_Alert','AnomlyCount'), 10000);
    const MitreIntervalId = setInterval(() => pollingFunction('Mitre/Mitre_Alert','MitreCount'), 10000);

    // Clean up the interval when the component unmounts
    return () => {
     clearInterval(dnsIntervalId);
     clearInterval(dnsExfiltrationIntervalId);
     clearInterval(ddosIntervalId);
      clearInterval(encryptionIntervalId);
      clearInterval(AnomlyIntervalId);
      clearInterval(MitreIntervalId);
    };
  }, [alertsEnabled]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
     
      {showPopup && <AlertPopup alertData={alerts[0]} onClose={closePopup} />}
    </div>
  );
};

export default DNS_AlertComp;
