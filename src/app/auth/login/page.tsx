"use client";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonLog, Error, FormTest, Progress } from "./style";
import { Button, CircularProgress } from "@mui/material";
import { useIsLoginMutation } from "@/redux/api/authApi";
import { error } from "console";
import { useEffect, useState } from "react";
import { useActions } from "@/redux/hooks/useActions";
import { useRouter } from "next/navigation";
import { HeaderTitle } from "@/widgets/Header/style";
import Link from "next/link";

export type LoginInput = {
  email: string;
  password: string;
};

export default function AuthForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginInput>();
  const router = useRouter();
  const [addLogin, { isError, error, isLoading }] = useIsLoginMutation<any>();
  const { setAuthenticated } = useActions();
  const onSubmit: SubmitHandler<LoginInput> = async (dataLog) => {
    try {
      const response: any = await addLogin(dataLog).unwrap();

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      console.log("Login successful");
      setAuthenticated(true);
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  useEffect(() => {
    if (error) {
      setErrorMessage(error.data.message);
      console.log(error.data.message);
    }
  }, [error]);
  return (
    <>
      <HeaderTitle>Войдите</HeaderTitle>
      <FormTest component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={isError}
          id="login"
          label="email "
          variant="outlined"
          {...register("email", { required: "Поле обязательно к заполнению" })}
        />
        {errors.email && <Error>{errors?.email?.message || "Error"}</Error>}
        <TextField
          error={isError}
          id="register"
          label="password"
          variant="outlined"
          {...register("password", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 5,
              message: "Минимум 5 символов",
            },
          })}
        />
        {errors.password && (
          <Error>{errors?.password?.message || "Error"}</Error>
        )}
        {error && <Error>{errorMessage}</Error>}
        <ButtonLog>
          {isLoading ? (
            <Progress></Progress>
          ) : (
            <Button variant="contained" type="submit">
              Войти
            </Button>
          )}

          <Button>
            <Link href={"/auth/registration"}>Зарегестрироваться</Link>
          </Button>
        </ButtonLog>
      </FormTest>
    </>
  );
}
