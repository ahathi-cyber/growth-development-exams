/* Source-only psychiatry bank.
 * Only questions transcribed from the user's uploaded Final MBBS past-paper PDFs may be added.
 * Do not create, paraphrase, repeat, or pad questions to reach a target count.
 * These categories intentionally remain empty until a question is verified against a source page.
 */
window.PSYCHIATRY_MODULE_BANKS = {
  "foundations": {label:"Foundations: History, MSE & Psychopathology",tf:[],sba:[],essays:[]},
  "mood": {label:"Mood Disorders & Suicide Risk",tf:[],sba:[],essays:[]},
  "psychosis": {
    label:"Schizophrenia & Psychotic Disorders",
    tf:[
      {statements:[
        ["Capgras delusions are Schneider's first-rank symptoms of schizophrenia.",false],
        ["Delusional perception is a Schneider first-rank symptom of schizophrenia.",true],
        ["Second-person auditory hallucinations are Schneider's first-rank symptoms of schizophrenia.",false],
        ["Visual hallucinations are Schneider's first-rank symptoms of schizophrenia.",false],
        ["Somatic hallucinations are Schneider's first-rank symptoms of schizophrenia.",false]
      ]},
      {statements:[
        ["Male to female ratio in schizophrenia is 2:1.",true],
        ["In males, the mean age of onset of schizophrenia is 45 years.",false],
        ["Early age of onset of schizophrenia has a good prognosis.",false],
        ["Heritability of schizophrenia is 50%.",true],
        ["Lifetime risk of suicide is higher in schizophrenia than in the general population.",true]
      ]},
      {statements:[
        ["Birth trauma is a risk factor for the development of schizophrenia.",true],
        ["Advanced paternal age is a risk factor for the development of schizophrenia.",true],
        ["Cannabis use is a risk factor for the development of schizophrenia.",true],
        ["Migration is a risk factor for the development of schizophrenia.",true],
        ["Malnutrition during pregnancy is a risk factor for the development of schizophrenia.",true]
      ]}
    ],
    sba:[
      {stem:"A diagnosed patient with schizophrenia came to clinic with symptoms. He has been prescribed several medications over 10 years. According to him he has taken medications as prescribed. What is the most important next step?",options:{A:"Administering ECT",B:"Appoint a supportive person to supervise",C:"Taking collateral history",D:"Start Clozapine",E:"IM Flupentixol decanoate"},answer:"C",explanation:"Source: Psychiatry - Categorized MCQ (2025 September added), p. 23; 2025 September, SBA 9."},
      {stem:"A 19-year-old male believes that the birth mark on his hand indicates that he was born to royalty. He wishes to claim his birth right from the queen of England. He believes that his parents are imposters who abducted him from his original family. He hears the voice of a neighbour telling him to travel to England to claim his rightful inheritance. Which psychopathology is more likely to indicate a diagnosis of schizophrenia in this patient?",options:{A:"Second-person auditory hallucinations",B:"Persecutory delusions",C:"Delusion of perception",D:"Grandiose delusion",E:"Capgras delusion"},answer:"E",explanation:"Source: Psychiatry - Categorized MCQ (2025 September added), p. 25; 2020 June, SBA 35."},
      {stem:"A young man with schizophrenia complains of hearing three criminals talking about him. He does not know where they are. They do not mention his name, but refer to him as the man with a mental illness. He hears them planning to kill him. What is the most likely psychopathology?",options:{A:"Persecutory delusions",B:"Delusion of reference",C:"Second-person auditory hallucinations",D:"Third-person auditory hallucinations",E:"Delusion of control"},answer:"D",explanation:"Source: Psychiatry - Categorized MCQ (2025 September added), p. 27; 2019 March, SBA 45."}
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
