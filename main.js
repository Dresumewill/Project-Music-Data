import { getSong } from "./data.js";

// Q1 — Most listened song by play count
function mostListenedSong(eventsList) {
	if (eventsList.length === 0) return null;

	const counts = {};
	let maxId = null;
	let maxCount = 0;

	for (const item of eventsList) {
		counts[item.song_id] = (counts[item.song_id] || 0) + 1;
		if (counts[item.song_id] > maxCount) {
			maxCount = counts[item.song_id];
			maxId = item.song_id;
		}
	}

	return getSong(maxId);
}

// Q2 — Most listened artist by play count
function mostListenedArtist(eventsList) {
	if (eventsList.length === 0) return null;

	const counts = {};
	let maxArtist = null;
	let maxCount = 0;

	for (const item of eventsList) {
		const song = getSong(item.song_id);
		counts[song.artist] = (counts[song.artist] || 0) + 1;
		if (counts[song.artist] > maxCount) {
			maxCount = counts[song.artist];
			maxArtist = song.artist;
		}
	}

	return maxArtist;
}

// Q3 — Most listened song on Friday night (by count)
function mostListenedSongFridayNight(eventsList) {
	const hour = 3600;
	const FRIDAY_START_SECONDS = 17 * hour;
	const SATURDAY_END_SECONDS = 4 * hour;

	const fridayNightEvents = eventsList.filter(event => {
		const day = new Date(event.timestamp).getDay();
		return (day === 5 && event.seconds_since_midnight >= FRIDAY_START_SECONDS) ||
			(day === 6 && event.seconds_since_midnight < SATURDAY_END_SECONDS);
	});

	if (fridayNightEvents.length === 0) return null;
	return mostListenedSong(fridayNightEvents);
}

// Q4a — Most listened song by listening time
function mostListenedSongByTime(eventsList) {
	if (eventsList.length === 0) return null;

	const counts = {};
	let maxId = null;
	let maxCount = 0;

	for (const item of eventsList) {
		const song = getSong(item.song_id);
		counts[song.id] = (counts[song.id] || 0) + song.duration_seconds;
		if (counts[song.id] > maxCount) {
			maxCount = counts[song.id];
			maxId = song.id;
		}
	}

	return getSong(maxId);
}

// Q4b — Most listened artist by listening time
function mostListenedArtistByTime(eventsList) {
	if (eventsList.length === 0) return null;

	const counts = {};
	let maxArtist = null;
	let maxCount = 0;

	for (const item of eventsList) {
		const song = getSong(item.song_id);
		counts[song.artist] = (counts[song.artist] || 0) + song.duration_seconds;
		if (counts[song.artist] > maxCount) {
			maxCount = counts[song.artist];
			maxArtist = song.artist;
		}
	}

	return maxArtist;
}

// Q4c — Most listened song on Friday night (by time)
function mostListenedFridayNightByTime(eventsList) {
	const hour = 3600;
	const FRIDAY_START_SECONDS = 17 * hour;
	const SATURDAY_END_SECONDS = 4 * hour;

	const fridayNightEvents = eventsList.filter(event => {
		const day = new Date(event.timestamp).getDay();
		return (day === 5 && event.seconds_since_midnight >= FRIDAY_START_SECONDS) ||
			(day === 6 && event.seconds_since_midnight < SATURDAY_END_SECONDS);
	});

	if (fridayNightEvents.length === 0) return null;
	return mostListenedSongByTime(fridayNightEvents);
}

// Q5 — Song with the longest consecutive streak
function mostListenedConsecutiveSong(eventsList) {
	if (eventsList.length === 0) return null;

	let bestSongId = null;
	let bestCount = 0;
	let currentSongId = null;
	let count = 0;

	for (const event of eventsList) {
		if (currentSongId === event.song_id) {
			count++;
		} else {
			currentSongId = event.song_id;
			count = 1;
		}
		if (count > bestCount) {
			bestCount = count;
			bestSongId = currentSongId;
		}
	}

	return { songId: bestSongId, count: bestCount };
}

// Helper to format date as YYYY-MM-DD
function formatDate(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}

// Q6 — Songs listened to every day
function songsListenedEveryDay(listOfEvents) {
	if (listOfEvents.length === 0) return [];

	const songsByDay = {};

	for (const event of listOfEvents) {
		const date = formatDate(new Date(event.timestamp));
		if (!songsByDay[date]) {
			songsByDay[date] = new Set();
		}
		songsByDay[date].add(event.song_id);
	}

	const days = Object.values(songsByDay);
	let intersection = new Set(days[0]);

	for (let i = 1; i < days.length; i++) {
		intersection = new Set([...intersection].filter(songId => days[i].has(songId)));
	}

	return [...intersection];
}

// Q7 — Top genres by play count
function topGenres(eventsList, n = 3) {
	if (eventsList.length === 0) return [];

	const counts = {};

	for (const item of eventsList) {
		const song = getSong(item.song_id);
		counts[song.genre] = (counts[song.genre] || 0) + 1;
	}

	const sorted = Object.entries(counts)
		.map(([genre, count]) => ({ genre, count }))
		.sort((a, b) => b.count - a.count);

	return sorted.slice(0, Math.min(n, sorted.length));
}

export {
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
};