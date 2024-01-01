from main import Test, User
import pickle
import os

def load_user(id):
    # check if user exists
    if not os.path.exists(f"users/{id}.pkl"):
        return None

    with open(f"users/{id}.pkl", "rb") as f:
        user = pickle.load(f)

    return user

user = load_user("dorian")

print(user.__dict__)

for test in user.tests:
    print(test.__dict__)
