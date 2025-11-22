import { supabase } from "./supabaseClient.js";

window.uploadPhoto = async () => {
  const file = document.getElementById("photo").files[0];
  const title = document.getElementById("title").value;
  if (!file || !title) return alert("Photo and title required");

  const status = document.getElementById("status");
  status.innerText = "Uploading...";

  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from('photos')
    .upload(fileName, file);

  if (uploadError) return status.innerText = uploadError.message;

  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(fileName);

  const people = document.getElementById("people").value.split(",").map(p => p.trim()).filter(p => p);

  const { error } = await supabase.from('photos').insert({
    title,
    caption: document.getElementById("caption").value,
    location: document.getElementById("location").value || null,
    people: people.length ? people : null,
    image_url: publicUrl
  });

  if (error) status.innerText = error.message;
  else {
    status.innerText = "Uploaded successfully!";
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
    document.getElementById("photo").value = "";
  }
};