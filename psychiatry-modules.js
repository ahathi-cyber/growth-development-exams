/* Source-only psychiatry bank.
 * Only questions transcribed from the user's uploaded Final MBBS past-paper PDFs may be added.
 * Do not create, paraphrase, repeat, or pad questions to reach a target count.
 * These categories intentionally remain empty until a question is verified against a source page.
 */
window.PSYCHIATRY_MODULE_BANKS = {
  "foundations": {
    label:"Foundations: History, MSE & Psychopathology",
    tf:[
      {statements:[
        ["Cataplexy – Catatonia.",false,"Source: Psych MCQs by M, p. 4; 2025 September, T/F 1."],
        ["Formication – Cocaine abuse.",true,"Source: Psych MCQs by M, p. 4; 2025 September, T/F 1."],
        ["Perseveration – Dementia.",true,"Source: Psych MCQs by M, p. 4; 2025 September, T/F 1."],
        ["Talking past the point – Anxiety.",false,"Source: Psych MCQs by M, p. 4; 2025 September, T/F 1."],
        ["Anosognosia – Stroke.",true,"Source: Psych MCQs by M, p. 4; 2025 September, T/F 1."]
      ]},
      {statements:[
        ["Auditory hallucinations can be dismissed at will.",false,"Source: Psych MCQs by M, p. 6; 2024 November, T/F 1."],
        ["Auditory hallucinations are diagnostic of schizophrenia.",false,"Source: Psych MCQs by M, p. 6; 2024 November, T/F 1."],
        ["Auditory hallucinations arise from inner subjective space.",false,"Source: Psych MCQs by M, p. 6; 2024 November, T/F 1."],
        ["Auditory hallucinations occur in delirium.",true,"Source: Psych MCQs by M, p. 6; 2024 November, T/F 1."],
        ["Thought echo is a type of auditory hallucination.",true,"Source: Psych MCQs by M, p. 6; 2024 November, T/F 1."]
      ]},
      {statements:[
        ["“I hear my name being called out, as I am falling asleep” – Third-person auditory hallucinations.",false,"Source: Psych MCQs by M, p. 8; 2024 January, T/F 1."],
        ["“When I’m in a meeting, I feel everyone looking at me” – Delusion of reference.",true,"Source: Psych MCQs by M, p. 8; 2024 January, T/F 1."],
        ["“I can hear a voice asking me to run” – Running commentary.",false,"Source: Psych MCQs by M, p. 8; 2024 January, T/F 1."],
        ["“I have the power of Kali Amma” – Bizarre delusion.",false,"Source: Psych MCQs by M, p. 8; 2024 January, T/F 1."],
        ["“My neighbours are putting ideas in my head” – Delusional perception.",false,"Source: Psych MCQs by M, p. 8; 2024 January, T/F 1."]
      ]},
      {statements:[
        ["In flight of ideas, the patient's thoughts frequently change to another topic.",true,"Source: Psych MCQs by M, p. 9; 2024 January, T/F 2."],
        ["Flight of ideas is seen in anxiety disorders.",false,"Source: Psych MCQs by M, p. 9; 2024 January, T/F 2."],
        ["Rapid speed of speech is seen in flight of ideas.",true,"Source: Psych MCQs by M, p. 9; 2024 January, T/F 2."],
        ["Derailment is seen in flight of ideas.",false,"Source: Psych MCQs by M, p. 9; 2024 January, T/F 2."],
        ["Clang associations are present in flight of ideas.",true,"Source: Psych MCQs by M, p. 9; 2024 January, T/F 2."]
      ]}
    ],
    sba:[
      {stem:"A 32-year-old woman says that while walking by a park she saw a pigeon and heard a car horn, and believed these were a message that she was chosen to save the human race. She believes the pigeon symbolized purity and the horn was a signal to act. What psychopathology best describes this?",options:{A:"Delusion of reference",B:"Grandiose delusion",C:"Bizarre delusion",D:"Delusional perception",E:"Delusion of control"},answer:"D",explanation:"Source: Psych MCQs by M, p. 5; 2025 September, SBA 2."},
      {stem:"A 65-year-old woman says, “I feel like there are insects inside my body. I know that it is impossible, but I keep worrying about it and cannot stop thinking about it.” What is the psychopathology?",options:{A:"Tactile hallucination",B:"Obsessional thought",C:"Pseudohallucinations",D:"Specific phobia",E:"Delusion of infestation"},answer:"B",explanation:"Source: Psych MCQs by M, p. 7; 2024 November, SBA 2."},
    ],
    essays:[]
  },
  "mood": {
    label:"Mood Disorders & Suicide Risk",
    tf:[
      {statements:[
        ["Features of lithium toxicity include fine tremors.",false,"Source: Psych MCQs by M, p. 99; 2025 September, T/F 1."],
        ["Features of lithium toxicity include confusion.",true,"Source: Psych MCQs by M, p. 99; 2025 September, T/F 1."],
        ["Features of lithium toxicity include ataxia.",true,"Source: Psych MCQs by M, p. 99; 2025 September, T/F 1."],
        ["Features of lithium toxicity include polyuria.",false,"Source: Psych MCQs by M, p. 99; 2025 September, T/F 1."],
        ["Features of lithium toxicity include nystagmus.",false,"Source: Psych MCQs by M, p. 99; 2025 September, T/F 1."]
      ]},
      {statements:[
        ["In a mixed affective episode, both manic and depressive symptoms are seen during the same episode.",true,"Source: Psych MCQs by M, p. 103; 2024 January, T/F 1."],
        ["Rapid cycling is more common in men than women.",false,"Source: Psych MCQs by M, p. 103; 2024 January, T/F 1."],
        ["Cyclothymia is a milder form of bipolar affective disorder.",true,"Source: Psych MCQs by M, p. 103; 2024 January, T/F 1."],
        ["For most patients, the first episode is manic.",false,"Source: Psych MCQs by M, p. 103; 2024 January, T/F 1."],
        ["Psychotic symptoms are not seen in hypomania.",true,"Source: Psych MCQs by M, p. 103; 2024 January, T/F 1."]
      ]},
      {statements:[
        ["The mean duration of an untreated manic episode is 6 months.",true,"Source: Psych MCQs by M, p. 104; 2024 January, T/F 2."],
        ["The majority of patients whose first episode is manic will not have further mood disturbances.",false,"Source: Psych MCQs by M, p. 104; 2024 January, T/F 2."],
        ["The duration between episodes gets longer as the patient gets older.",false,"Source: Psych MCQs by M, p. 104; 2024 January, T/F 2."],
        ["Type 2 bipolar affective disorder has a better prognosis than type 1 bipolar affective disorder.",true,"Source: Psych MCQs by M, p. 104; 2024 January, T/F 2."],
        ["If left untreated, bipolar affective disorder can predispose to dementia.",true,"Source: Psych MCQs by M, p. 104; 2024 January, T/F 2."]
      ]}
    ],
    sba:[
      {stem:"A 26-year-old man diagnosed with bipolar affective disorder presents with persistent low mood, lack of energy and ideas of self-harm for two weeks. His past clinic record indicates that his last relapse was two years ago and that he was prescribed lithium 500 mg daily. What is the most appropriate management?",options:{A:"Increase the dose of lithium to 750 mg daily",B:"Start supportive psychotherapy",C:"Reassure the patient that symptoms will disappear",D:"Add sodium valproate",E:"Request a serum lithium level"},answer:"E",explanation:"Source: Psychiatry - Categorized MCQ (2025 September added), p. 33; 2024 November, SBA 8. Answer key: Psych MCQs by M, pp. 101–102."},
      {stem:"A patient with bipolar affective disorder presents with increased sleepiness, weight gain, constipation and easy fatigability for three months. The disorder has been well controlled with lithium carbonate 500 mg at night for the last two years. What is the next step in management?",options:{A:"Increase lithium carbonate dose",B:"Add sertraline",C:"Add sodium valproate",D:"Add olanzapine",E:"Do thyroid function tests"},answer:"E",explanation:"Source: Psych MCQs by M, p. 102; 2024 December, SBA 3."}
    ],
    essays:[]
  },
  "psychosis": {
    label:"Schizophrenia & Psychotic Disorders",
    tf:[
      {statements:[
        ["The incidence of mortality in schizophrenia is higher compared to the general population.",true,"Source key: Psych MCQs by M, p. 65; 2023 T/F 2."],
        ["Schizophrenia is associated with obsessive compulsive disorder.",true,"Source key: Psych MCQs by M, pp. 65–66; 2023 T/F 2."],
        ["First-rank symptoms are needed for the diagnosis of schizophrenia.",false,"Source key: Psych MCQs by M, p. 66; 2023 T/F 2."],
        ["The prodrome of schizophrenia is characterized by prominent psychotic symptoms.",false,"Source key: Psych MCQs by M, p. 66; 2023 T/F 2."],
        ["The risk of suicide in schizophrenia is higher during the initial period of the illness.",true,"Source key: Psych MCQs by M, pp. 65–66; 2023 T/F 2."]
      ]},
      {statements:[
        ["Birth trauma is a risk factor for the development of schizophrenia.",true,"Source key: Psych MCQs by M, p. 65; 2023 T/F 1."],
        ["Advanced paternal age is a risk factor for the development of schizophrenia.",true,"Source key: Psych MCQs by M, p. 65; 2023 T/F 1."],
        ["Cannabis is a risk factor for the development of schizophrenia.",true,"Source key: Psych MCQs by M, p. 65; 2023 T/F 1."],
        ["Migration is a risk factor for the development of schizophrenia.",true,"Source key: Psych MCQs by M, p. 65; 2023 T/F 1."],
        ["Malnutrition during pregnancy is a risk factor for the development of schizophrenia.",true,"Source key: Psych MCQs by M, p. 65; 2023 T/F 1."]
      ]},
      {statements:[
        ["Nimal hears the voice of an unseen woman telling him he has the ability to save the world from avian flu. This feature alone for one month is sufficient for a diagnosis of schizophrenia.",false,"Source key: Psych MCQs by M, p. 66; 2023 schizophrenia question 3 (FFFFF)."],
        ["Jude feels the presence of God in church. This feature alone for one month is sufficient for a diagnosis of schizophrenia.",false,"Source key: Psych MCQs by M, p. 66; 2023 schizophrenia question 3 (FFFFF)."],
        ["Lal often thinks his thoughts are known by others. This feature alone for one month is sufficient for a diagnosis of schizophrenia.",false,"Source key: Psych MCQs by M, p. 66; 2023 schizophrenia question 3 (FFFFF)."],
        ["Rizna keeps her hand in the same position until it is moved by someone else. This feature alone for one month is sufficient for a diagnosis of schizophrenia.",false,"Source key: Psych MCQs by M, p. 66; 2023 schizophrenia question 3 (FFFFF)."],
        ["Raja does not have the energy to go to his job. This feature alone for one month is sufficient for a diagnosis of schizophrenia.",false,"Source key: Psych MCQs by M, p. 66; 2023 schizophrenia question 3 (FFFFF)."]
      ]}
    ],
    sba:[
      {stem:"A diagnosed patient with schizophrenia came to clinic with symptoms. He has been prescribed several medications over 10 years. According to him he has taken medications as prescribed. What is the most important next step?",options:{A:"Administering ECT",B:"Appointing a supportive person to supervise",C:"Taking collateral history",D:"Starting clozapine",E:"IM flupentixol decanoate"},answer:"C",explanation:"Source: Psychiatry - Categorized MCQ (2025 September added), p. 23; SBA 9."},
      {stem:"A 19-year-old male believes that the birth mark on his hand indicates that he was born to royalty. He wishes to claim his birth right from the queen of England. He believes that his parents are imposters who abducted him from his original family. He hears the voice of a neighbour telling him to travel to England to claim his rightful inheritance. Which psychopathology is more likely to indicate a diagnosis of schizophrenia in this patient?",options:{A:"Second-person auditory hallucinations",B:"Persecutory delusions",C:"Delusion of perception",D:"Grandiose delusion",E:"Capgras delusion"},answer:"C",explanation:"Source: Psychiatry - Categorized MCQ (2024 Jan added), pp. 21–22; 2020 June, SBA 35. Key verified in Psych MCQs by M, p. 72."},
      {stem:"A 19-year-old previously well male is brought to the psychiatric clinic by his parents due to irritability, poor sleep and social withdrawal. Which of the following best supports a diagnosis of schizophrenia if present for more than one month?",options:{A:"Delusional belief that others are plotting about him",B:"Hearing voices commanding him to kill himself",C:"A delusional belief that others are laughing at him",D:"A delusional belief that others could read his thoughts",E:"A delusional belief that others are talking about him"},answer:"D",explanation:"Source: Psychiatry - Categorized MCQ (2024 Jan added), p. 22; keyed in Psych MCQs by M, p. 73."},
      {stem:"A young man with schizophrenia complains of hearing three criminals talking about him. He does not know where they are. They do not mention his name, but refer to him as the man with a mental illness. He hears them planning to kill him. What is the most likely psychopathology?",options:{A:"Persecutory delusions",B:"Delusion of reference",C:"Second-person auditory hallucinations",D:"Third-person auditory hallucinations",E:"Delusion of control"},answer:"D",explanation:"Source: Psychiatry - Categorized MCQ (2024 Jan added), p. 23; 2019 March, SBA 45."},
      {stem:"A 20-year-old patient diagnosed with schizophrenia developed a severe dystonic reaction after the haloperidol dose was increased the previous day. What is the most appropriate next step in management?",options:{A:"Change to olanzapine",B:"IM benztropine",C:"Give IV diazepam",D:"IM promethazine",E:"IV atropine"},answer:"B",explanation:"Source: Psychiatry - Categorized MCQ (2024 Jan added), p. 22; keyed in Psych MCQs by M, p. 73."}
    ],
    essays:[]
  },
  "anxiety-ocd": {label:"Anxiety, OCD & Related Disorders",tf:[],sba:[],essays:[]},
  "stress-somatoform": {label:"Stress, Somatic & Dissociative Disorders",tf:[],sba:[],essays:[]},
  "substances": {label:"Alcohol & Substance Use Disorders",tf:[],sba:[],essays:[]},
  "personality": {label:"Personality & Impulse Control Disorders",tf:[],sba:[],essays:[]},
  "child-adolescent": {label:"Child & Adolescent Psychiatry",tf:[],sba:[],essays:[]},
  "older-adults": {label:"Psychiatry of Older Adults",tf:[],sba:[],essays:[]},
  "intellectual-disability": {label:"Intellectual Disability & Learning Disorders",tf:[],sba:[],essays:[]},
  "eating-sleep": {label:"Eating & Sleep Disorders",tf:[],sba:[],essays:[]},
  "sexual-health": {label:"Human Sexuality & Gender-Related Presentations",tf:[],sba:[],essays:[]},
  "treatments": {label:"Psychopharmacology & Psychological Treatments",tf:[],sba:[],essays:[]},
  "emergencies": {label:"Psychiatric Emergencies & Clinical Risk",tf:[],sba:[],essays:[]},
  "forensic-ethics": {label:"Forensic Psychiatry, Ethics & Mental Health Law",tf:[],sba:[],essays:[]},
  "liaison-misc": {label:"Liaison Psychiatry & Miscellaneous Topics",tf:[],sba:[],essays:[]}
};
