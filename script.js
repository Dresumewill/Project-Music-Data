import { getUserIDs, getListenEvents, getSong } from "./data.js";
import {
	mostListenedSong,
	mostListenedArtist,
	mostListenedSongFridayNight,
	mostListenedSongByTime,
	mostListenedArtistByTime,
	mostListenedFridayNightByTime,
	mostListenedConsecutiveSong,
	songsListenedEveryDay,
	topGenres
} from "./main.js";

const userSelect = document.getElementById("user-select");
const resultsSection = document.getElementById("results");

const userIDs = getUserIDs();
for (const id of userIDs) {
	const option = document.createElement("option");
	option.value = id;
	option.textContent = `User ${id}`;
	userSelect.appendChild(option);
}

function formatSong(song) {
	return `${song.artist} - ${song.title}`;
}

userSelect.addEventListener("change", () => {
	const userId = userSelect.value;
	resultsSection.innerHTML = "";

	if (!userId) return;

	const events = getListenEvents(userId);

	if (events.length === 0) {
		resultsSection.innerHTML = "<p>This user didn't listen to any songs.</p>";
		return;
	}

	let html = "";

	// Q1: Most listened song by count
	const songByCount = mostListenedSong(events);
	html += `<h2>Most listened song</h2><p>${formatSong(songByCount)}</p>`;

	// Q4a: Most listened song by time
	const songByTime = mostListenedSongByTime(events);
	html += `<h2>Most listened song (by listening time)</h2><p>${formatSong(songByTime)}</p>`;

	// Q2: Most listened artist by count
	const artistByCount = mostListenedArtist(events);
	html += `<h2>Most listened artist</h2><p>${artistByCount}</p>`;

	// Q4b: Most listened artist by time
	const artistByTime = mostListenedArtistByTime(events);
	html += `<h2>Most listened artist (by listening time)</h2><p>${artistByTime}</p>`;

	// Q3: Friday night song by count
	const fridaySongCount = mostListenedSongFridayNight(events);
	if (fridaySongCount) {
		html += `<h2>Most listened song on Friday night</h2><p>${formatSong(fridaySongCount)}</p>`;
	}

	// Q4c: Friday night song by time
	const fridaySongTime = mostListenedFridayNightByTime(events);
	if (fridaySongTime) {
		html += `<h2>Most listened song on Friday night (by listening time)</h2><p>${formatSong(fridaySongTime)}</p>`;
	}

	// Q5: Longest consecutive streak
	const streak = mostListenedConsecutiveSong(events);
	if (streak) {
		const streakSong = getSong(streak.songId);
		html += `<h2>Longest listening streak</h2><p>${formatSong(streakSong)} (${streak.count} times in a row)</p>`;
	}

	// Q6: Songs listened every day
	const everydaySongs = songsListenedEveryDay(events);
	if (everydaySongs.length > 0) {
		const songNames = everydaySongs.map(id => formatSong(getSong(id))).join(", ");
		html += `<h2>Songs listened to every day</h2><p>${songNames}</p>`;
	}

	// Q7: Top genres
	const genres = topGenres(events);
	if (genres.length > 0) {
		const genreCount = genres.length;
		const label = genreCount === 1 ? "Top genre" : `Top ${genreCount} genres`;
		const genreNames = genres.map(g => g.genre).join(", ");
		html += `<h2>${label}</h2><p>${genreNames}</p>`;
	}

	resultsSection.innerHTML = html;
});