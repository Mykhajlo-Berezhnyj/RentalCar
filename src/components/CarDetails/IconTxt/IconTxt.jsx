import css from "./IconTxt.module.css";

export default function IconText({ icon, children }) {
  return (
    <div className={css.wrap}>
      {icon }
      <p>{children}</p>
    </div>
  );
}
