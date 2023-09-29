import instance from ".";

const ExplanationRequest = async (textToExplain) =>
{
  try
  {
    const response = await instance.post('chat/completions', {
      model: "gpt-3.5-turbo-instruct", // Add the model parameter
      messages: [{ role: 'system', content: 'You are an assistant i trust.' }, { role: 'user', content: textToExplain }]
    });

    if (response.status === 200)
    {
      const { content } = response.data.choices[0].message;
      console.log(content);
      return content;
    } else
    {
      console.error('Failed to fetch explanation');
      console.log(response); // Log the entire response for debugging
      return null;
    }
  } catch (error)
  {
    console.error('Error fetching explanation:', error);
    return null;
  }
};

export default ExplanationRequest;
