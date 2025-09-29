---
description: 'Python coding conventions and guidelines'
applyTo: '**/*.py'
---

# Python Coding Conventions

## 1. Code Style and Formatting (PEP 8)

### Basic Formatting
- Use **4 spaces** for indentation (never tabs)
- Limit lines to **88 characters** (Black formatter standard) or **79 characters** (strict PEP 8)
- Use **UTF-8** encoding for all Python files
- End files with a single newline character

### Imports
- Group imports in this order: standard library, third-party, local application
- Use absolute imports when possible
- Place imports at the top of the file, after module docstrings
- Separate import groups with blank lines

```python
# Standard library
import os
import sys
from pathlib import Path

# Third-party
import requests
import numpy as np

# Local application
from myproject.utils import helper_function
```

### Blank Lines
- Two blank lines around top-level class and function definitions
- One blank line around method definitions inside classes
- Use blank lines sparingly within functions to separate logical sections

### Naming Conventions
- **Variables and functions**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`
- **Private attributes/methods**: prefix with single underscore `_private_method`
- **Strongly private**: prefix with double underscore `__very_private`

## 2. Type Annotations (Modern Python 3.9+)

### Use Built-in Generic Types
```python
# ✅ Modern syntax (Python 3.9+)
def process_items(items: list[str]) -> dict[str, int]:
    return {item: len(item) for item in items}

# ❌ Deprecated syntax
from typing import List, Dict
def process_items(items: List[str]) -> Dict[str, int]:
    return {item: len(item) for item in items}
```

### Union Types
```python
# ✅ Use | for union types (Python 3.10+)
def handle_id(user_id: int | str) -> str:
    return str(user_id)

# ✅ Use | None instead of Optional
def get_user(user_id: int) -> User | None:
    return database.find_user(user_id)

# ❌ Avoid Union and Optional
from typing import Union, Optional
def handle_id(user_id: Union[int, str]) -> str:
    return str(user_id)
```

### Deprecated Type Aliases
Use modern built-in types instead of `typing` module aliases:

- Use `list[T]` instead of `List[T]`
- Use `dict[K, V]` instead of `Dict[K, V]`
- Use `set[T]` instead of `Set[T]`
- Use `tuple[T, ...]` instead of `Tuple[T, ...]`
- Use `type[T]` instead of `Type[T]`

### Prefer `object` over `Any`
```python
# ✅ Use object and cast when needed
from typing import cast

data: dict[str, object] = {"name": "John", "age": 30}
age = cast(int, data["age"])

# ❌ Avoid Any when possible
from typing import Any
data: dict[str, Any] = {"name": "John", "age": 30}
```

## 3. Documentation and Comments

### Docstrings (PEP 257)
```python
def calculate_compound_interest(
    principal: float,
    rate: float,
    time: float,
    compound_frequency: int = 1
) -> float:
    """Calculate compound interest using the standard formula.
    
    Args:
        principal: Initial amount invested
        rate: Annual interest rate (as decimal, e.g., 0.05 for 5%)
        time: Time period in years
        compound_frequency: How many times per year interest compounds
        
    Returns:
        Final amount after compound interest
        
    Raises:
        ValueError: If principal, rate, or time is negative
        
    Example:
        >>> calculate_compound_interest(1000, 0.05, 2)
        1102.5
    """
    if principal < 0 or rate < 0 or time < 0:
        raise ValueError("Principal, rate, and time must be non-negative")
    
    return principal * (1 + rate / compound_frequency) ** (compound_frequency * time)
```

### Class Docstrings
```python
class BankAccount:
    """Represents a bank account with basic operations.
    
    This class provides methods for depositing, withdrawing,
    and checking the balance of a bank account.
    
    Attributes:
        account_number: Unique identifier for the account
        balance: Current account balance
        owner: Account holder's name
    """
    
    def __init__(self, account_number: str, owner: str, initial_balance: float = 0.0):
        self.account_number = account_number
        self.owner = owner
        self.balance = initial_balance
```

### Comments
Follow the self-explanatory code principles:
- Comment **WHY**, not **WHAT**
- Explain business logic and complex algorithms
- Document API constraints and gotchas
- Use TODO, FIXME, NOTE annotations when appropriate

```python
# Business rule: Apply progressive tax brackets
tax_brackets = [(0, 0.10), (50000, 0.22), (200000, 0.32)]

# Using binary search for O(log n) performance on large datasets
index = bisect.bisect_left(sorted_items, target)
```

## 4. Functions and Methods

### Function Design
- Keep functions small and focused on a single responsibility
- Use descriptive names that clearly indicate the function's purpose
- Prefer pure functions when possible (no side effects)
- Use default arguments judiciously

```python
def validate_email_format(email: str) -> bool:
    """Check if email matches standard format pattern."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_notification(
    user: User,
    message: str,
    *,
    priority: str = "normal",
    send_email: bool = True,
    send_sms: bool = False
) -> bool:
    """Send notification to user with specified channels."""
    # Implementation here
```

### Method Organization in Classes
```python
class DataProcessor:
    """Process and transform data from various sources."""
    
    def __init__(self, config: ProcessingConfig):
        self._config = config
        self._cache: dict[str, object] = {}
    
    # Public methods first
    def process(self, data: list[dict[str, object]]) -> list[dict[str, object]]:
        """Main processing method."""
        return self._transform(self._validate(data))
    
    # Private methods last
    def _validate(self, data: list[dict[str, object]]) -> list[dict[str, object]]:
        """Validate input data format."""
        # Implementation
    
    def _transform(self, data: list[dict[str, object]]) -> list[dict[str, object]]:
        """Apply transformations to validated data."""
        # Implementation
```

## 5. Error Handling

### Exception Handling
```python
# ✅ Specific exception handling
try:
    result = process_data(user_input)
except ValueError as e:
    logger.error(f"Invalid input data: {e}")
    return {"error": "Invalid input format"}
except FileNotFoundError:
    logger.error("Required configuration file not found")
    return {"error": "System configuration error"}

# ✅ Custom exceptions
class InvalidConfigurationError(Exception):
    """Raised when configuration file is invalid or missing required fields."""
    pass

def load_config(file_path: str) -> dict[str, object]:
    if not file_path.exists():
        raise InvalidConfigurationError(f"Configuration file not found: {file_path}")
```

### Input Validation
```python
def divide_numbers(a: float, b: float) -> float:
    """Divide two numbers with proper validation."""
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Both arguments must be numbers")
    
    if b == 0:
        raise ValueError("Cannot divide by zero")
    
    return a / b
```

## 6. Testing and Quality Assurance

### Unit Testing
```python
import pytest
from mymodule import calculate_compound_interest

class TestCompoundInterest:
    """Test cases for compound interest calculation."""
    
    def test_basic_calculation(self):
        """Test basic compound interest calculation."""
        result = calculate_compound_interest(1000, 0.05, 2)
        assert abs(result - 1102.5) < 0.01
    
    def test_edge_cases(self):
        """Test edge cases and error conditions."""
        with pytest.raises(ValueError):
            calculate_compound_interest(-1000, 0.05, 2)
        
        # Zero values should work
        assert calculate_compound_interest(0, 0.05, 2) == 0
        assert calculate_compound_interest(1000, 0, 2) == 1000
    
    @pytest.mark.parametrize("principal,rate,time,expected", [
        (1000, 0.05, 1, 1050),
        (2000, 0.03, 3, 2185.45),
        (500, 0.08, 0.5, 519.62),
    ])
    def test_multiple_scenarios(self, principal, rate, time, expected):
        """Test multiple calculation scenarios."""
        result = calculate_compound_interest(principal, rate, time)
        assert abs(result - expected) < 0.01
```

### Code Quality Checklist
- [ ] All functions have type annotations
- [ ] All public functions have docstrings
- [ ] Complex logic is documented with comments
- [ ] Error cases are handled appropriately
- [ ] Edge cases are tested
- [ ] Code follows naming conventions
- [ ] No linting errors (use `ruff` or `flake8`)
- [ ] Code is formatted consistently (use `black`)

## 7. Performance and Best Practices

### Efficient Python Patterns
```python
# ✅ Use list comprehensions for simple transformations
squared_numbers = [x**2 for x in numbers if x > 0]

# ✅ Use enumerate() instead of range(len())
for i, item in enumerate(items):
    print(f"{i}: {item}")

# ✅ Use pathlib for file operations
from pathlib import Path
config_file = Path("config") / "settings.json"
if config_file.exists():
    content = config_file.read_text()

# ✅ Use context managers for resource management
with open("data.txt") as file:
    content = file.read()

# ✅ Use f-strings for string formatting
message = f"User {user.name} has {user.score} points"
```

### Memory and Performance
- Use generators for large datasets
- Prefer `dict.get()` over checking keys with `in`
- Use `collections.defaultdict` for grouped data
- Consider `functools.lru_cache` for expensive computations

```python
from functools import lru_cache
from collections import defaultdict

@lru_cache(maxsize=128)
def expensive_calculation(n: int) -> int:
    """Cached expensive calculation."""
    return sum(i**2 for i in range(n))

def group_by_category(items: list[Item]) -> dict[str, list[Item]]:
    """Group items by category efficiently."""
    groups: dict[str, list[Item]] = defaultdict(list)
    for item in items:
        groups[item.category].append(item)
    return dict(groups)
```
