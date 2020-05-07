import React from "react";
import CategoryCard from "./CategoryCard";

export default function Category({ data, vendorList, user }) {
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
            {vendorList && vendorList.vendors.map((v) => <CategoryCard key={v.businessName} vendor={v} user={user} />)}
          </div>
        </li>
      </ul>
    </div>
  );
}
