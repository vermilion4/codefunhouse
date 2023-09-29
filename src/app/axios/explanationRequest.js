import instance from ".";

const ExplanationRequest = async (textToExplain) =>
{
  try
  {
    const response = await instance.post('completions', {
      model: "gpt-3.5-turbo-instruct",
      prompt: textToExplain
    });

    if (response.status === 200)
    {
      const { text } = response.data.choices[0];
      console.log(text);
      return text;
    } else
    {
      console.error('Failed to fetch explanation');
      return null;
    }
  } catch (error)
  {
    console.error('Error fetching explanation:', error);
    return null;
  }
};

export default ExplanationRequest;
