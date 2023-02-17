export const emotionName = {
  positive: { kor: "긍정" },
  negative: { kor: "부정" },
  neutral: { kor: "중립" },
  ambiguous: { kor: "모호" },
};

export const emotionClass = {
  none: { kor: "감정없음", class: "neutral" },
  surprised: { kor: "놀람", class: "positive" },
  fear: { kor: "두려움", class: "negative" },
  uncertain: { kor: "불확실", class: "neutral" },
  sadness: { kor: "슬픔", class: "negative" },
  dislike: { kor: "싫음", class: "negative" },
  good: { kor: "좋음", class: "positive" },
  bored: { kor: "지루함", class: "ambiguous" },
  shame: { kor: "창피함", class: "ambiguous" },
};

export const emotionClassKorean = {
  감정없음: "neutral",
  놀람: "positive",
  두려움: "negative",
  불확실: "neutral",
  슬픔: "negative",
  싫음: "negative",
  좋음: "positive",
  지루함: "ambiguous",
  창피함: "ambiguous",
};
