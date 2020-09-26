from transformers import AutoModelWithLMHead, AutoTokenizer

def test1(language, model, tokenizer):
    inputs = tokenizer.encode(
        "translate English to {language}: Hugging Face is a technology company based in New York and Paris".format(language = language),
        return_tensors="pt")
    outputs = model.generate(inputs, max_length=40, num_beams=4, early_stopping=True)
    print(tokenizer.decode(outputs[0]))

if __name__ == '__main__':
    model = AutoModelWithLMHead.from_pretrained("t5-base")
    tokenizer = AutoTokenizer.from_pretrained("t5-base")
    test1('German', model, tokenizer)
    test1('French', model, tokenizer)
    test1('Romanian', model, tokenizer)