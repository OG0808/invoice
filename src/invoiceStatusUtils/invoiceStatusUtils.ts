type StatusDictionary = {
    [key: string]: {
      badgeClass: string;
      borderClass: string;
    };
  };
  
  const statusDictionary: StatusDictionary = {
    paid: {
      badgeClass: "badgePaid",
      borderClass: "hover:border-green-500",
    },
    pending: {
      badgeClass: "badgePending",
      borderClass: "hover:border-orange-500",
    },
    draft: {
      badgeClass: "badgeDraft",
      borderClass: "hover:border-black",
    },
  };
  
  export const statusInfo = (invStatus: string) => {
    return statusDictionary[invStatus]?.badgeClass || '';
  };
  
 export  const borderStatus = (invStatus: string) => {
    return statusDictionary[invStatus]?.borderClass || '';
  };
  