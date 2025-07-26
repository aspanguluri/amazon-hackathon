from pydantic import BaseModel

class ProductDescription(BaseModel):
    product_name: str
    description: str
    dimensions: str
    asin: str