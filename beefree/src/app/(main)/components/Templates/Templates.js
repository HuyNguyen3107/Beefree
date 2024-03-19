import React from "react";
import styles from "./templates.module.scss";
import Link from "next/link";
import Image from "next/image";
import templatesImg from "../../../../assets/images/templates.png";
import { AiOutlineCheck } from "react-icons/ai";

function Templates() {
  return (
    <section className={styles.templates}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Image src={templatesImg} alt="templates" />
          </div>
          <div className="col-6">
            <h2>
              Increase student engagement with ready-to-use Higher Ed templates
            </h2>
            <div>
              <p>Choose from 1500+ free email editable templates</p>
              <div>
                <p>
                  <AiOutlineCheck /> Exclusive access to the world’s largest
                  collection of editable templates
                </p>
                <p>
                  <AiOutlineCheck /> Get started with pre-designed templates or
                  create your own from scratch
                </p>
                <p>
                  <AiOutlineCheck /> Create mobile-responsive emails and pages
                  with zero design restrictions
                </p>
              </div>
              <Link href={"#"}>Browser the catalog</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Templates;
