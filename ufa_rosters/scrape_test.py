import unittest
import scrape

class TestScrape(unittest.TestCase):
    def test_get_page_success(self):
        page = scrape.getTeamPage('hustle')
        self.assertEqual(page.status_code, 200)

    def test_get_invalid_page(self):
        with self.assertRaises(Exception):
            scrape.getTeamPage('not_a_team')

    def test_team_names_validity(self):
        # no 404s getting teams
        for team_name in scrape.team_names:
            scrape.getTeamPage(team_name)

    def test_get_players(self):
        self.assertIn('Matt Smith', scrape.getRoster('hustle'))

if __name__ == '__main__':
    unittest.main()