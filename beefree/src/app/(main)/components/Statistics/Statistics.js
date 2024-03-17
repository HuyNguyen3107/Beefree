import React from "react";
import styles from "./statistics.module.scss";
import { PiLightningFill } from "react-icons/pi";
import { FaCopy } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaChartPie } from "react-icons/fa";

function Statistics() {
  return (
    <section className={styles.statistics}>
      <div className="container">
        <h2>
          Deliver exceptional, on-brand emails. No <br /> technical skills
          required
        </h2>
        <div className="row">
          <div className="col-3">
            <PiLightningFill />
            <span>FASTER EMAIL CREATION</span>
            <span>82%</span>
            <span>of users experienced faster email creation</span>
          </div>
          <div className="col-3">
            <FaCopy />
            <span>SEAMLESS INTEGRATION</span>
            <span>44%</span>
            <span>of users found exporting designs to be effortless</span>
          </div>
          <div className="col-3">
            <FaArrowTrendUp />
            <span>BOOSTED EFFICIENCY</span>
            <span>63%</span>
            <span>of Beefree users increased their CTR by 11% or more</span>
          </div>
          <div className="col-3">
            <FaChartPie />
            <span>INCREASED ROI</span>
            <span>73%</span>
            <span>of users had a payback period of 3 months or less</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Statistics;
