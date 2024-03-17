import React from "react";
import styles from "./service.module.scss";
import Link from "next/link";
import { IoCardSharp } from "react-icons/io5";

function Service() {
  return (
    <section className={styles.service}>
      <div className="container">
        <h2>
          Get started for free. <br />
          Upgrade as your student base grows.
        </h2>
        <div>
          <Link href={"#"}>Billed monthly</Link>
          <Link href={"#"}>Billed yearly</Link>
        </div>
        <div className="row">
          <div className="col-3">
            <div>
              <span>Free</span>
              <p>
                All of the essentials you need <br /> to get started.
              </p>
              <span>
                Great for <br /> occasional projects
              </span>
            </div>
            <div>
              <span>$0</span>
              <Link href={"#"}>Start for free</Link>
              <span>
                <IoCardSharp />
                No credit card required
              </span>
            </div>
            <div>
              <span>Free, forever:</span>
              <p>
                Mobile design mode, one-click export to your favorite sending
                platform, access to 1,500+ free templates, and more.
              </p>
            </div>
          </div>
          <div className="col-3">
            <div>
              <span>Team</span>
              <p>
                Manage more assets and <br /> add flexibility for collaboration.
              </p>
              <span>
                Best for freelancers <br />
                or small teams
              </span>
            </div>
            <div>
              <span>$25/mo</span>
              <Link href={"#"}>Get a 15-day free trial</Link>
              <span>
                <IoCardSharp />
                No credit card required
              </span>
            </div>
            <div>
              <span>Everything in Free, plus:</span>
              <p>
                Unlimited emails, pages, folders, and reusable blocks, as well
                as customizable user roles and permissions, and more.
              </p>
            </div>
          </div>
          <div className="col-3">
            <div>
              <span>Enterprise</span>
              <p>
                Tools for control, security, <br />
                and support at scale.
              </p>
              <span>
                For organizations with <br />
                established workflows
              </span>
            </div>
            <div>
              <span>Custom</span>
              <Link href={"#"}>Contact sales</Link>
              <span>
                <IoCardSharp />
                No credit card required
              </span>
            </div>
            <div>
              <span>Everything in Team, plus:</span>
              <p>
                Multi-workspace environment, improved workspace management and
                user permissions, custom domains, increased monthly image
                hosting space, premium support, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
