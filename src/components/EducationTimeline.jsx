export default function EducationTimeline() {
  const education = [
    {
      year: "2023 - Sekarang",
      school: "Universitas Harkat Negeri",
      major: "D4 Teknik Informatika",
    },
    {
      year: "2020 - 2023",
      school: "MA Al-Islamiyyah",
      major: "Ilmu Pengetahuan Sosial (IPS)",
    },
  ];

  return (
    <div className="timeline">
      {education.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <span>{item.year}</span>
            <h3>{item.school}</h3>
            <p>{item.major}</p>
          </div>
        </div>
      ))}
    </div>
  );
}