const HEROES = ["Abrams","Apollo","Bebop","Billy","Calico","Celeste","Doorman","Drifter","Dynamo","Graves","Grey Talon","Haze","Holliday","Infernus","Ivy","Kelvin","Lady Geist","Lash","McGinnis","Mina","Mirage","MoKrill","Paige","Paradox","Pocket","Rem","Seven","Shiv","Silver","Sinclair","Venator","Victor","Vindicta","Viscous","Vyper","Warden","Wraith","Yamato"];

export default function HeroGallery() {
  return (
    <div className="dl-hero-grid mt-3">
      {HEROES.map((name) => (
        <img
          key={name}
          src={"/deadlock/heroes/" + encodeURIComponent(name) + ".png"}
          alt={name}
          title={name}
          loading="lazy"
        />
      ))}
    </div>
  );
}