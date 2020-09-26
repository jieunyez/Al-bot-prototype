from transformers import pipeline


def test1():
    print(translator("Hugging Face is a technology company based in New York and Paris", max_length=40))

if __name__ == '__main__':
    translator = pipeline("translation_en_to_de")
    test1()