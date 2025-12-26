from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000")

        # Age verification
        page.wait_for_selector("h2")
        page.screenshot(path="age_verification.png")
        page.get_by_placeholder("Enter your age").fill("17")
        page.get_by_role("button", name="Submit").click()

        # Category selection
        page.wait_for_selector("h2")
        page.screenshot(path="category_selection.png")
        page.get_by_text("Action").click()
        page.get_by_text("Adventure").click()
        page.get_by_text("Animation").click()
        page.get_by_role("button", name="Continue").click()

        # Final page
        page.wait_for_selector(".nav-container")
        page.screenshot(path="final_page.png")
    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
