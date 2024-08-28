import React, { createContext, useState } from "react";

export const projectAddResponse = createContext("");
export const editResponseContext = createContext("");

function ContextShare({ children }) {
  const [addResponse, setAddResponse] = useState("");
  const [editresponse, setEditResponse] = useState("");

  return (
    <>
      <projectAddResponse.Provider value={{ addResponse, setAddResponse }}>
        <editResponseContext.Provider value={{ editresponse, setEditResponse }}>
          {children}
        </editResponseContext.Provider>
      </projectAddResponse.Provider>
    </>
  );
}

export default ContextShare;
