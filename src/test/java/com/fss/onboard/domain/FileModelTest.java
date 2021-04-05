package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class FileModelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FileModel.class);
        FileModel fileModel1 = new FileModel(null, null);
        fileModel1.setId(1L);
        FileModel fileModel2 = new FileModel(null, null, null);
        fileModel2.setId(fileModel1.getId());
        assertThat(fileModel1).isEqualTo(fileModel2);
        fileModel2.setId(2L);
        assertThat(fileModel1).isNotEqualTo(fileModel2);
        fileModel1.setId(null);
        assertThat(fileModel1).isNotEqualTo(fileModel2);
    }
}
