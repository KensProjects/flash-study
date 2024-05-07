'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import type { FlashCardType } from "./CardList"
import { useState } from "react"
import CardButtons from "./CardButtons"

export default function FlashCard({ question, answer, id }: FlashCardType) {

  const [isRevealed, setIsRevealed] = useState(false)

  function flipCard() {
    setIsRevealed(revealed => !revealed)
  }

  return (
    <Card className={`w-11/12 lg:w-full h-full flex flex-col justify-between items-center bg-slate-100 text-center border-black border relative overflow-auto`}>
      <CardHeader onClick={() => flipCard()} className="cursor-pointer p-1">
        <CardTitle className="mt-4 underline underline-offset-2">{!isRevealed ? "Question" : "Answer"}</CardTitle>
        <CardDescription className="text-xl font-bold text-center">
          {!isRevealed ? `${question}` : `${answer}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-fit flex justify-center items-center pb-2">
        <CardButtons id={id} question={question} answer={answer}/>
      </CardContent>
    </Card>
  )
}
