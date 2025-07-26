import os
from dotenv import load_dotenv
from google import generativeai as genai
from analyze.models import ProductDescription

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key= api_key)
model = genai.GenerativeModel("gemini-1.5-flash")

def product_description_to_prompt(product_description):
    return f"""
    You are a sustainability expert. Analyze the following product and provide a sustainability assessment along with actionable suggestions for improvement or alternative options.
    Product Information:

    Product Name: {product_description.product_name}
    Description: {product_description.description}
    Dimensions: {product_description.dimensions}
    ASIN: {product_description.asin}
    
    Please provide:
    1. A sustainability **score** from 1 to 10 and a **brief justification**.
    2. A breakdown of **positive sustainability aspects**.
    3. A breakdown of **negative aspects** or environmental concerns.
    4. **Suggestions** to the user for more eco-friendly alternatives or actions they can take (e.g., buy in bulk, choose refillable products).
    5. If available, recommend **certifications or labels** the user should look for in similar products.
    6. If applicable, suggest **recycling or disposal methods** for the product.
    
    Be concise but informative. Present your answer in a markdown format.
    """

def getResponse(product_description: ProductDescription) -> str:
    prompt = product_description_to_prompt(product_description)
    response = model.generate_content(prompt)
    return response.text
