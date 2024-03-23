import unittest
import scrape
import pprint

class TestScrape(unittest.TestCase):
    def test_get_page_success(self):
        page = scrape.getTeamPage('hustle')
        self.assertEqual(page.status_code, 200)
    def test_get_invalid_page(self):
        with self.assertRaises(Exception):
            page = scrape.getTeamPage('not_a_team')


if __name__ == '__main__':
    unittest.main()