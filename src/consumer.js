import { supabase } from "./supabaseClient.js";

const feed = document.getElementById("feed");
let allPhotos = [];

supabase.from('photos').select('*').order('created_at', { ascending: false })
  .then(({ data }) => {
    allPhotos = data;
    renderFeed(allPhotos);
  });

supabase.channel('public:photos').on('postgres_changes', { event: '*', schema: 'public', table: 'photos' }, payload => {
  location.reload(); // simple real-time refresh
}).subscribe();

window.filterFeed = () => {
  const term = document.getElementById("search").value.toLowerCase();
  const filtered = allPhotos.filter(p => p.title.toLowerCase().includes(term));
  renderFeed(filtered);
};

function renderFeed(photos) {
  feed.innerHTML = photos.map(p => `
    <div class="photo-card">
      <img src="${p.image_url}" onclick="location.href='photo.html?id=${p.id}'">
      <h3>${p.title}</h3>
      <p>${p.caption || ''}</p>
      <small>${p.location || ''} ${p.people ? ' | ' + p.people.join(", ") : ''}</small>
    </div>
  `).join("");
}