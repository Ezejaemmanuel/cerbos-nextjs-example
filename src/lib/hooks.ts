import { useEffect, useState } from "react";
import cerbos from "./cerbos-browser";

interface User {
  id: string;
  roles: string[];
  attr: {
    [key: string]: any;
  };
}

interface Resource {
  id: string;
  [key: string]: any;
}

export function useCerbos(
  user: User,
  resource: Resource,
  action: string
): boolean {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuthz = async () => {
      const decision = await cerbos.checkResource({
        principal: user,
        resource: {
          id: resource.id,
          kind: "expense",
          attr: resource,
        },
        actions: [action],
      });

      setIsAllowed(decision.isAllowed(action)!);
    };

    checkAuthz();
  }, [user, resource, action]);

  return isAllowed;
}
