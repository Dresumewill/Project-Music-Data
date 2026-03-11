import { getSong, getListenEvents } from "./data.js";

const eventsList = getListenEvents("1")
function mostListenedSong(eventList) {
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

	const song = getSong(maxId);
	return song;
}


function mostListenedArtist(userID) {
	const eventsList = getListenEvents(userID);
	const counts = {};

	let maxArtist = null;
	let maxCount = 0;

	const songsList = [];

	for (const item of eventsList) {
		const song = getSong(item.song_id)
		songsList.push(song)
	}

	for (const song of songsList) {
		counts[song.artist] = (counts[song.artist] || 0) + 1;
		if (counts[song.artist] > maxCount) {
			maxCount = counts[song.artist];
			maxArtist = song.artist;
		}
	}

	return maxArtist
}


function mostListenedSongFridayNight (eventsList) {
	const fridayNightSongs = eventsList.filter(event => {
		const day = new Date(event.timestamp).getDay();
		return day === 5 || day === 6;
	})
	const mostListenedSongFriday = mostListenedSong( fridayNightSongs);
	return mostListenedSongFriday
}

function mostListenedConsecutiveSong(eventsList) {
	const songConsecutiveStrike = {
		songId: null,
		count: 0
	};

	let currentSongId = null;
	let maxStreak = 0;
	let count = 0

	eventsList.forEach((event) => {

		if(currentSongId === event.song_id) {
			count++
		} 
		else {
			currentSongId = event.song_id;
			count = 1;
		}

		if(maxStreak < count) {
			maxStreak = count;
			songConsecutiveStrike.songId = currentSongId;
			songConsecutiveStrike.count = maxStreak;
		}
	});

	return songConsecutiveStrike
}

const songid = mostListenedConsecutiveSong(eventsList)

console.log(songid)


// const result = mostListenedArtist("1");

// console.log(result)