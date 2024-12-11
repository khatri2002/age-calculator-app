import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import classNames from "classnames";

import { DEFAULT_AGE, fields } from "./data";
import { Inputs } from "./types";
import IconArrow from "../../assets/images/icon-arrow.svg";
import styles from "./Home.module.scss";

const Home = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const [age, setAge] = useState<Inputs>(DEFAULT_AGE);

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, ""); // remove non-numeric characters
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { day, month, year } = data;
    const dateString = `${year}-${month}-${day}`;
    if (!moment(dateString, "YYYY-MM-DD").isValid()) {
      fields.forEach((field) => {
        setError(field.key, { type: "invalid-date" });
      });
      setAge(DEFAULT_AGE);
      return;
    }
    const today = new Date();
    const birthDateObj = new Date(dateString);

    let ageYears = today.getFullYear() - birthDateObj.getFullYear();
    let ageMonths = today.getMonth() - birthDateObj.getMonth();
    let ageDays = today.getDate() - birthDateObj.getDate();

    // adjust for negative values
    if (ageDays < 0) {
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += lastMonthDate.getDate();
      ageMonths--;
    }

    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears--;
    }
    setAge({
      year: ageYears.toString(),
      month: ageMonths.toString(),
      day: ageDays.toString(),
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Age Calculator App</h1>
      <div className={styles.box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fieldsContainer}>
            {fields.map((field, index) => {
              return (
                <div
                  key={index}
                  className={classNames({
                    [styles.item]: true,
                    [styles.error]: errors[field.key],
                  })}
                >
                  <label htmlFor={field.key}>{field.label}</label>
                  <input
                    type="text"
                    id={field.key}
                    placeholder={field.placeholder}
                    {...register(field.key, {
                      onChange: handleNumericInput,
                      ...field.rules,
                    })}
                    aria-invalid={errors[field.key] ? "true" : "false"}
                  />
                  <span role="alert" className={styles.errorText}>
                    {errors[field.key]?.message}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.line} />
            <button className={styles.btn} type="submit">
              <img src={IconArrow} alt="icon-arrow" />
            </button>
          </div>
        </form>
        <div className={styles.valuesContainer}>
          <div className={styles.item}>
            <span className={styles.value}>{age.year}</span>
            <span className={styles.label}>years</span>
          </div>
          <div className={styles.item}>
            <span className={styles.value}>{age.month}</span>
            <span className={styles.label}>months</span>
          </div>
          <div className={styles.item}>
            <span className={styles.value}>{age.day}</span>
            <span className={styles.label}>days</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
