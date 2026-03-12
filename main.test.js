import { describe, test, expect } from "@jest/globals";
import { getListenEvents, getSong } from "./data.js";
import {
	mostListenedSong,
	mostListenedArtist,
	mostListenedSongFridayNight,
	mostListenedSongByTime,
	mostListenedArtistByTime,
	mostListenedFridayNightByTime,
	mostListenedConsecutiveSong,
	songsListenedEveryDay,
	topGenres,
	formatDate
} from "./main.js";

describe("User 1", () => {
	const events = getListenEvents("1");

	test("most listened song by count is When Your Mind's Made Up", () => {
		const song = mostListenedSong(events);
		expect(song.artist).toBe("The Swell Season");
		expect(song.title).toBe("When Your Mind's Made Up");
	});

	test("most listened song by time is Insomnia", () => {
		const song = mostListenedSongByTime(events);
		expect(song.artist).toBe("Faithless");
		expect(song.title).toBe("Insomnia");
	});

	test("most listened artist by count is Frank Turner", () => {
		expect(mostListenedArtist(events)).toBe("Frank Turner");
	});

	test("most listened artist by time is Frank Turner", () => {
		expect(mostListenedArtistByTime(events)).toBe("Frank Turner");
	});

	test("friday night song by count is When Your Mind's Made Up", () => {
		const song = mostListenedSongFridayNight(events);
		expect(song.artist).toBe("The Swell Season");
		expect(song.title).toBe("When Your Mind's Made Up");
	});

	test("friday night song by time is When Your Mind's Made Up", () => {
		const song = mostListenedFridayNightByTime(events);
		expect(song.artist).toBe("The Swell Season");
		expect(song.title).toBe("When Your Mind's Made Up");
	});

	test("longest streak is I Got Love with 34", () => {
		const streak = mostListenedConsecutiveSong(events);
		expect(streak.songId).toBe("song-1");
		expect(streak.count).toBe(34);
	});

	test("songs listened every day includes song-8", () => {
		const songs = songsListenedEveryDay(events);
		expect(songs).toContain("song-8");
	});

	test("top genres are Pop, Folk, Punk", () => {
		const genres = topGenres(events);
		expect(genres.map(g => g.genre)).toEqual(["Pop", "Folk", "Punk"]);
	});
});

describe("User 2", () => {
	const events = getListenEvents("2");

	test("most listened song by count is I Still Believe", () => {
		const song = mostListenedSong(events);
		expect(song.artist).toBe("Frank Turner");
		expect(song.title).toBe("I Still Believe");
	});

	test("most listened song by time is I Still Believe", () => {
		const song = mostListenedSongByTime(events);
		expect(song.artist).toBe("Frank Turner");
		expect(song.title).toBe("I Still Believe");
	});

	test("friday night song by count is I Still Believe", () => {
		const song = mostListenedSongFridayNight(events);
		expect(song.artist).toBe("Frank Turner");
		expect(song.title).toBe("I Still Believe");
	});

	test("friday night song by time is Photosynthesis", () => {
		const song = mostListenedFridayNightByTime(events);
		expect(song.artist).toBe("Frank Turner");
		expect(song.title).toBe("Photosynthesis");
	});

	test("longest streak is I Still Believe with 44", () => {
		const streak = mostListenedConsecutiveSong(events);
		expect(streak.songId).toBe("song-5");
		expect(streak.count).toBe(44);
	});

	test("songs listened every day includes Photosynthesis and Tonight We Fly", () => {
		const songs = songsListenedEveryDay(events);
		expect(songs).toContain("song-4");
		expect(songs).toContain("song-9");
	});

	test("top genres has only Pop", () => {
		const genres = topGenres(events);
		expect(genres.length).toBe(1);
		expect(genres[0].genre).toBe("Pop");
	});
});

describe("User 3", () => {
	const events = getListenEvents("3");

	test("most listened song by count is Be More Kind", () => {
		const song = mostListenedSong(events);
		expect(song.artist).toBe("Frank Turner");
		expect(song.title).toBe("Be More Kind");
	});

	test("most listened song by time is Insomnia", () => {
		const song = mostListenedSongByTime(events);
		expect(song.artist).toBe("Faithless");
		expect(song.title).toBe("Insomnia");
	});

	test("friday night returns null (no Friday listens)", () => {
		expect(mostListenedSongFridayNight(events)).toBeNull();
		expect(mostListenedFridayNightByTime(events)).toBeNull();
	});

	test("longest streak is 42", () => {
		const streak = mostListenedConsecutiveSong(events);
		expect(streak.count).toBe(42);
	});

	test("no songs listened every day", () => {
		const songs = songsListenedEveryDay(events);
		expect(songs).toEqual([]);
	});

	test("top genres are Pop, Folk, House", () => {
		const genres = topGenres(events);
		expect(genres.map(g => g.genre)).toEqual(["Pop", "Folk", "House"]);
	});
});

describe("User 4 (no data)", () => {
	const events = getListenEvents("4");

	test("most listened song returns null", () => {
		expect(mostListenedSong(events)).toBeNull();
	});

	test("most listened artist returns null", () => {
		expect(mostListenedArtist(events)).toBeNull();
	});

	test("friday night returns null", () => {
		expect(mostListenedSongFridayNight(events)).toBeNull();
	});

	test("most listened song by time returns null", () => {
		expect(mostListenedSongByTime(events)).toBeNull();
	});

	test("consecutive song returns null", () => {
		expect(mostListenedConsecutiveSong(events)).toBeNull();
	});

	test("songs listened every day returns empty array", () => {
		expect(songsListenedEveryDay(events)).toEqual([]);
	});

	test("top genres returns empty array", () => {
		expect(topGenres(events)).toEqual([]);
	});
});

describe("formatDate", () => {
	test("pads single digit month and day", () => {
		expect(formatDate(new Date("2024-01-05T12:00:00"))).toBe("2024-01-05");
	});

	test("handles double digit month and day", () => {
		expect(formatDate(new Date("2024-12-25T12:00:00"))).toBe("2024-12-25");
	});

	test("handles October correctly", () => {
		expect(formatDate(new Date("2024-10-01T12:00:00"))).toBe("2024-10-01");
	});
});