from pydantic import BaseModel

class ProductDescription(BaseModel):
    product_name: str
    description: str
    materials: str
    dimensions: str
    asin: str