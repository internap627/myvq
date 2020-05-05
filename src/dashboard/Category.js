import React from "react";

export default function Category({ data, vendorList }) {
  return (
    <div>
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            <span>
              <img src={data[1]} alt="icon" /> &nbsp;{" "}
            </span>
            {data[0]}
          </div>
          <div className="collapsible-body">
            {vendorList && vendorList.vendors.map((v) => <span key={v.businessName}>{v.businessName}</span>)}
          </div>
        </li>
      </ul>
    </div>
  );
}
