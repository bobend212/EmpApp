using System;

namespace API.DTOs.WorkloadDTOs
{
    public class WorkloadToShowDTO
    {
        public int WorkloadId { get; set; }
        public DateTime? OrderPlaced { get; set; }
        public string Site { get; set; }
        public string DesignInfo { get; set; }
        public bool DrgsReceived { get; set; }
        public bool EngReceived { get; set; }
        public string SlabStage { get; set; }
        public string BRegsStage { get; set; }
        public string ProductionStage { get; set; }
        public bool Issued { get; set; }
        public string Planner { get; set; }
        public float EstimDesignTime { get; set; }

        public DateTime? SlabRequired { get; set; }
        public DateTime? SlabEstimated { get; set; }
        public DateTime? SlabIssued { get; set; }

        public DateTime? BRegsRequired { get; set; }
        public DateTime? BRegsEstimated { get; set; }
        public DateTime? BRegsIssued { get; set; }

        public DateTime? FullSetRequired { get; set; }
        public DateTime? FullSetEstimated { get; set; }
        public DateTime? FullSetIssued { get; set; }

        public DateTime? IssuingRequired { get; set; }
        public DateTime? IssuingEstimated { get; set; }
        public DateTime? IssuingIssued { get; set; }

        public DateTime? Delivery { get; set; }

        public string Comments { get; set; }

        public int ProjectId { get; set; }
        public string ProjectNumber { get; set; }
        public string ProjectName { get; set; }
    }
}