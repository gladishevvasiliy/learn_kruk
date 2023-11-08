"use client";
import {
  ButtonNext,
  ContainerQ,
  DivImg,
  DivQuestions,
  DivTitle,
  Line,
  None,
  Znamya,
} from "./style";
import { AnswerType, QuestionType } from "@/shared/ui/BurgerButton/api/testsData/fakeApi/testsData";
import { useRef, useState } from "react";
import { AnswerOption } from "@/features/answerOptions";
import { useActions } from "@/redux/hooks/useActions";
import { Counter } from "@/features/counter";
import LineProgress from "@/features/lineProgress";
import { AnswerMessage } from "../AnswerMessage";
interface Props {
  currentQuestion: QuestionType;
  numberQuestions: number;
  questionTestId: number;
  setQuestionTestId: (questionTestId: number) => void;
  answers: AnswerType[]
}

export default function Questions({
  answers,
  currentQuestion,
  numberQuestions,
  questionTestId,
  setQuestionTestId,
}: Props) {
  const [answerId, setAnswerId] = useState<number | null>(null);
  const isAnswer = typeof answerId === "number";
  const { addCorrectAnswers, addTestTime } = useActions();
  const correctAnswerId = currentQuestion.correctAnswersIds[0];
  const timeRef = useRef<number>(0);

  const onAnswer = (answerId: number) => () => {
    if (answerId === correctAnswerId) {
      addCorrectAnswers();
    }
    setAnswerId(answerId);
  };

  return (
    <>
      <Counter mRef={timeRef} />
      <DivQuestions>
        <DivImg>
          <Znamya
            dangerouslySetInnerHTML={{ __html: currentQuestion.znamya }}
          ></Znamya>
        </DivImg>
        <DivTitle>
          <p>{currentQuestion.question}</p>
        </DivTitle>
        <Line></Line>
      </DivQuestions>
      <AnswerMessage
        isAnswer={isAnswer}
        isCorrectAnswer={correctAnswerId === answerId}
      />
      <ContainerQ>
        {answers.map((e) => {
          return (
            <AnswerOption
              key={e.id}
              answer={e}
              onAnswer={onAnswer}
              isAnswer={isAnswer}
              correctAnswersId={correctAnswerId}
            />
          );
        })}
      </ContainerQ>
      {isAnswer ? (
        <ButtonNext
          onClick={() => {
            addTestTime(timeRef.current);
            setQuestionTestId(questionTestId + 1);
            setAnswerId(null);
          }}
          disabled={!isAnswer}
        >
          Далее
        </ButtonNext>
      ) : (
        <None />
      )}
      <LineProgress
        questionTestId={questionTestId}
        numberQuestions={numberQuestions}
      />
    </>
  );
}
