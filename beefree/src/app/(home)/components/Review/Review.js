import React from "react";
import styles from "./review.module.scss";
import Link from "next/link";
import Image from "next/image";
import { BsFillStarFill } from "react-icons/bs";
import avatar from "../../../../assets/images/myAvatar.jpg";
import { Pagination } from "@nextui-org/react";

function Review() {
  return (
    <section className={styles.review}>
      <h2>
        Real reviews from <strong>real customers</strong>
      </h2>
      <div>
        <div>
          <div>
            <BsFillStarFill /> <BsFillStarFill /> <BsFillStarFill />{" "}
            <BsFillStarFill /> <BsFillStarFill />
          </div>
          <p>BeePro has made my life so much easier</p>
          <Link href={"#"}>Show more</Link>
          <div>
            <div>
              <Image width={100} height={100} src={avatar} alt="avatar" />
            </div>
            <div>
              <span>Huy</span>
              <p>Graphic Designer Small-Business (50 or fewer emp.)</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <BsFillStarFill /> <BsFillStarFill /> <BsFillStarFill />{" "}
            <BsFillStarFill /> <BsFillStarFill />
          </div>
          <p>BeePro has made my life so much easier</p>
          <Link href={"#"}>Show more</Link>
          <div>
            <div>
              <Image width={100} height={100} src={avatar} alt="avatar" />
            </div>
            <div>
              <span>Huy</span>
              <p>Graphic Designer Small-Business (50 or fewer emp.)</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <BsFillStarFill /> <BsFillStarFill /> <BsFillStarFill />{" "}
            <BsFillStarFill /> <BsFillStarFill />
          </div>
          <p>BeePro has made my life so much easier</p>
          <Link href={"#"}>Show more</Link>
          <div>
            <div>
              <Image width={100} height={100} src={avatar} alt="avatar" />
            </div>
            <div>
              <span>Huy</span>
              <p>Graphic Designer Small-Business (50 or fewer emp.)</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Pagination total={10} initialPage={1} color="secondary" />
      </div>
      <div>
        <Link href={"#"}>Get started free</Link>
      </div>
    </section>
  );
}

export default Review;
