import pkg_resources
from importlib import import_module

def check_dependencies():
    dependencies = {
        'fastapi': 'FastAPI framework',
        'uvicorn': 'ASGI server',
        'transformers': 'Hugging Face Transformers',
        'torch': 'PyTorch',
        'multipart': 'Multipart form data support',
        'pydantic': 'Data validation',
        'jose': 'JWT tokens',
        'passlib': 'Password hashing',
        'bcrypt': 'Password hashing',
        'dotenv': 'Environment variables',
        'requests': 'HTTP client'
    }
    
    print("Checking dependencies and their versions...")
    print("-" * 70)
    
    all_installed = True
    for package, description in dependencies.items():
        try:
            # Try to import the package
            import_module(package)
            # Get the installed version
            version = pkg_resources.get_distribution(package).version
            print(f"✓ {package:<20} - {description:<30} (version: {version})")
        except ImportError as e:
            print(f"✗ {package:<20} - {description:<30}")
            print(f"  Error: {str(e)}")
            all_installed = False
        except pkg_resources.DistributionNotFound:
            print(f"✗ {package:<20} - {description:<30}")
            print(f"  Error: Package installed but version not found")
            all_installed = False
    
    print("-" * 70)
    if all_installed:
        print("All dependencies are installed successfully!")
    else:
        print("Some dependencies are missing or have issues. Please check the versions.")

if __name__ == "__main__":
    check_dependencies() 