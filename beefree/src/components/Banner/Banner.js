import styles from "./banner.module.scss";
import Link from "next/link";

function Banner() {
  return (
    <div className={styles.banner}>
      <Link href={"#"}>
        💡Introducing the Beefree Academy: Your free guide for learning the ins
        and outs of our email builder!
      </Link>
    </div>
  );
}

export default Banner;
