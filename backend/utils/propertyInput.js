function parsePropertyInput(body) {
  const title = String(body.title || "").trim();
  const location = String(body.location || "").trim();
  if (!title || !location) {
    const error = new Error("Title and location are required");
    error.status = 400;
    throw error;
  }

  const price = body.price === "" || body.price == null ? 0 : Number(body.price);
  if (!Number.isFinite(price) || price < 0) {
    const error = new Error("Price must be a valid non-negative number");
    error.status = 400;
    throw error;
  }

  let amenities = body.amenities || [];
  if (typeof amenities === "string") {
    try { amenities = JSON.parse(amenities); }
    catch { amenities = amenities.split(","); }
  }
  if (!Array.isArray(amenities)) amenities = [];

  return {
    title, location,
    district: String(body.district || "").trim(),
    price,
    area: String(body.area || "").trim(),
    description: String(body.description || "").trim(),
    amenities: amenities.map(x => String(x).trim()).filter(Boolean).slice(0, 30)
  };
}

module.exports = parsePropertyInput;
