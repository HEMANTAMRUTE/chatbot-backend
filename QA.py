import sys
from ctransformers import AutoModelForCausalLM

MODEL_PATH = r"C:\Desktop\chatbotwebd\model\tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf"
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH, model_type="llama")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide a prompt as argument.")
        sys.exit(1)

    prompt = f"### Instruction:\n{sys.argv[1]}\n\n### Response:\n"
    response = model(prompt)
    print(response)
