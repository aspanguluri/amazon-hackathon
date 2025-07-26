from fastapi import APIRouter
from analyze.models import ProductDescription
import geminiAnalysis
import requests

router = APIRouter()


@router.get("/")
async def analyze(amazon_product_url: str):
    url_verified, asin = verify_url(amazon_product_url)
    if url_verified:
        return {
            "valid": True,
            "webscrape": await webscrape(asin),
        }


def verify_url(url: str) -> tuple[bool, str]:
    import re
    regex_pattern = r"^https?://(?:www\.)?amazon\.[a-z]{2,3}/.*$"

    isValid = re.match(regex_pattern, url) is not None

    asin_match = re.search(r"/dp/([A-Z0-9]{10})", url)
    asin = asin_match.group(1) if asin_match else ""

    return isValid, asin

async def webscrape(asin: str) -> ProductDescription:
    params = {
        "api_key": "43E2803CA98544B191C4A3ABFA14EC28",
        "type": "product",
        "amazon_domain": "amazon.com",
        "asin": asin
    }

    response = requests.get("https://api.rainforestapi.com/request", params=params).json()

    return ProductDescription(
        product_name=response.get("product", {}).get("title", ""),
        description=response.get("product", {}).get("description", ""),
        dimensions=response.get("product", {}).get("dimensions", ""),
        asin=asin
    )

async def provide_analysis(product_description: ProductDescription) -> str:
    return geminiAnalysis.product_description_to_prompt(product_description)

