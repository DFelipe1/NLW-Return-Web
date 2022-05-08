import { CloseButton } from "../CloseButton";
import { useState } from "react";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeSteps } from "./Steps/FeedbackTypeSteps";
import { FeedbackContentSteps } from "./Steps/FeedbackContentSteps";
import { FeedbackSuccessSteps } from "./Steps/FeedbackSuccessSteps";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'imagem de uma lampada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'imagem de uma nivem de pensamento'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null)
    }

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            

           { feedbackSent ? (
               <FeedbackSuccessSteps onFeedbackRestartRequest={handleRestartFeedback}/>
           ) : (
               <>
                    {!feedbackType ? (
                        <FeedbackTypeSteps onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentSteps 
                                feedbackType={feedbackType}  
                                onFeedbackRestartRequest={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                    )}
               </>
           )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="http://https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    )
}