from transformers import AutoModelWithLMHead, AutoTokenizer


def text_generation(padding_text, prompt):
    model = AutoModelWithLMHead.from_pretrained("xlnet-base-cased", return_dict=True)
    tokenizer = AutoTokenizer.from_pretrained("xlnet-base-cased")

    inputs = tokenizer.encode(padding_text + prompt, add_special_tokens=False, return_tensors="pt")
    prompt_length = len(tokenizer.decode(inputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True))
    outputs = model.generate(inputs, max_length=250, do_sample=True, top_p=0.95, top_k=60)
    generated = prompt + tokenizer.decode(outputs[0])[prompt_length:]

    print(generated)


if __name__ == '__main__':
    padding_text = """A global pandemic has brought about unforeseen consequences at every level of business, 
    and even some of the biggest publicly traded companies in the world haven't been immune to its effects. In fact, 
    many of these companies are pivoting in ways that only a year ago would've been unthinkable. Yet there might be 
    some method to the madness, as changing strategies to adapt could offer key advantages in these unprecedented 
    times. Some of the changes the following companies have made are natural progressions of their business models; 
    some seem to come out of left field. But all of them have the potential to revolutionize each of these 
    businesses, and smart investors will keep a close eye on how successful these new strategies are in the months to 
    come. """
    prompt = "Here are eight companies pivoting"
    text_generation(padding_text, prompt)
