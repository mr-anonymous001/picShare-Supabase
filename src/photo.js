import { supabase } from "./supabaseClient.js";

const urlParams = new URLSearchParams(location.search);
const photoId = urlParams.get('id');

supabase.from('photos').select('*').eq('id', photoId).single()
  .then(({ data }) => {
    document.getElementById("detail").innerHTML = `
      <img src="${data.image_url}" style="max-width:100%">
      <h2>${data.title}</h2>
      <p>${data.caption || ''}</p>
    `;
  });

supabase.from('comments').select('*').eq('photo_id', photoId).order('created_at')
  .then(({ data }) => {
    document.getElementById("comments").innerHTML = data.map(c => `<p><b>${c.user_email}:</b> ${c.text}</p>`).join("");
  });

window.postComment = async () => {
  const text = document.getElementById("comment").value;
  if (!text) return;

  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from('comments').insert({
    photo_id: photoId,
    text,
    user_email: user.email
  });

  document.getElementById("comment").value = "";
  location.reload();
};


window.like = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('likes').insert({ photo_id: photoId, user_id: user.id });
  alert("Liked!");
};